const inp = document.getElementById("inp");
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const dlallBtn = document.getElementById("deleteall-btn");

let list = JSON.parse(localStorage.getItem("list")) || [];

function save() {
    localStorage.setItem("list", JSON.stringify(list));
}

function display() {
    result.innerHTML = "";
    list.forEach((item, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("taskdiv");

        const label = document.createElement("label");
        label.classList.add("task");
        label.textContent = item;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "-";
        deleteBtn.addEventListener("click", () => {
            list.splice(index, 1);
            save();
            display();
        });

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", () => {
            const inputEdit = document.createElement("input");
            inputEdit.className = "edit-input"
            inputEdit.type = "text";
            inputEdit.value = item;

            taskDiv.replaceChild(inputEdit, label);
            inputEdit.focus();

            inputEdit.addEventListener("blur", () => {
                const value = inputEdit.value.trim();
                if (value) {
                    list[index] = value;
                    save();
                }
                display();
            });

            inputEdit.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    inputEdit.blur();
                }
            });
        });

        taskDiv.appendChild(label);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(deleteBtn);
        result.appendChild(taskDiv);
    });
}

btn.addEventListener("click", () => {
    const value = inp.value.trim();
    if (value) {
        list.push(value);
        save();
        inp.value = "";
        inp.focus();
        display();
    }
});
let isConfirming = false; // متغير لمتابعة الحالة

dlallBtn.addEventListener("click", () => {
    if (!isConfirming) {
        // الحالة الأولى: الضغطة الأولى للتحذير
        isConfirming = true;
        dlallBtn.textContent = "Are you sure?";
        dlallBtn.classList.add("confirm-state"); // يمكنك إضافة تصميم مميز للزر هنا

        // إذا لم يضغط مرة أخرى خلال 3 ثوانٍ، يعود الزر لحالته الطبيعية
        setTimeout(() => {
            isConfirming = false;
            dlallBtn.textContent = "Delete All";
            dlallBtn.classList.remove("confirm-state");
        }, 3000);

    } else {
        // الحالة الثانية: الضغطة الثانية للتأكيد والحذف
        list = [];
        save();
        display();
        isConfirming = false; // إعادة تعيين الحالة
    }
});

inp.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

save();
display();