const saveBtn = document.getElementById("save-btn");
const records = document.getElementById("records");
saveBtn.addEventListener("click", function () {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  if (title !== "" && content !== "") {
    // membuat record
    createRecord(title, content);

    //menabahkan aksi edit saat record diklik
    editRecord();
  }

  saveData();
});

// memberi aksi delete pada delete button
const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", function () {
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  saveData();
});

// Menyimpan data ke Local Storage saat tombol ditekan
function saveData() {
  const htmlString = records.innerHTML;
  const value = htmlString;
  localStorage.setItem("recordsValue", value);
}

// membuat record
function createRecord(title, content) {
  const records = document.getElementById("records");
  const recordDiv = document.createElement("div");
  recordDiv.className = "record";
  recordDiv.id = "record";

  const recordTitle = document.createElement("p");
  recordTitle.textContent = title;
  const recordContent = document.createElement("p");
  recordContent.textContent = content;

  recordDiv.appendChild(recordTitle);
  recordDiv.appendChild(recordContent);
  records.prepend(recordDiv);

  document.getElementById("content").value = "";
  document.getElementById("title").value = "";
}

//menabahkan aksi edit saat record diklik
function editRecord() {
  const record = document.getElementById("record");
  record.addEventListener("click", function () {
    document.getElementById("title").value = record.childNodes[0].textContent;
    document.getElementById("content").value = record.childNodes[1].textContent;
    record.remove();
  });
}
// Memuat data dari Local Storage saat halaman dimuat
window.onload = function () {
  // mengambil record daro localstorage
  const savedHtml = localStorage.getItem("recordsValue");
  if (savedHtml) {
    records.innerHTML = savedHtml;
  }

  const edit = document.querySelectorAll(".record");

  // Tambahkan event listener ke setiap kartu
  edit.forEach((edit) => {
    edit.addEventListener("click", function () {
      document.getElementById("title").value = edit.childNodes[0].textContent;
      document.getElementById("content").value = edit.childNodes[1].textContent;
      edit.remove();
      saveData();
    });
  });

  // mengambil data tema dari localstorage
  const mode = localStorage.getItem("mode");
  if (mode === "light") {
    lightMode(document.getElementById("lightId"));
  } else {
    darkMode(document.getElementById("darkId"));
  }
};

//

// switch light or dark mode
const icon = document.querySelector("header i");
const body = document.querySelector("body");

let mode = "";
window.addEventListener("click", (e) => {
  if (e.target === icon) {
    if (icon.id === "darkId") {
      darkMode(e.target);
      mode = "dark";
      localStorage.setItem("mode", mode);
    } else {
      lightMode(e.target);
      mode = "light";
      localStorage.setItem("mode", mode);
    }
  }
});

function darkMode(e) {
  e.className = "bi bi-brightness-high-fill";
  e.id = "lightId";
  document.querySelector("body").className = "dark_mode";
}

function lightMode(e) {
  e.className = "bi bi-moon-fill";
  e.id = "darkId";
  document.querySelector("body").className = "light_mode";
}
