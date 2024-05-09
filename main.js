// import {jsPDF} from 'jspdf';
// import { Html2CanvasOptions } from 'jspdf';
var jq = $.noConflict();
var numberGroup = 0;

jq(document).on("click", ".add-item", function () {
  jq(this)
    .prev()
    .append(
      '<div class="info-box"><label for="" class="info-label">Item info name: </label><div class="info-input">Nội dung</div><select name="type-input" id="" class="type-input"><option value="text" class="opt-ip-type">Text</option><option value="email" class="opt-ip-type">Email</option> <option value="number" class="opt-ip-type">Number</option> </select><i class="fa-solid fa-trash"></i></div>'
    );
});

jq(document).on("click", ".add-group", function () {
  numberGroup++;
  jq(".group-container").append(
    '<div class="group-item"><p class="gr-head">Group Item_ 20215308<i class="fa-solid fa-trash-can"></i></p><div class="info-container"><div class="info-box"><label for="" class="info-label">Item info name: </label><div class="info-input">Nội dung</div><select name="type-input" id="" class="type-input"> <option value="text" class="opt-ip-type">Text</option><option value="email" class="opt-ip-type">Email</option><option value="number" class="opt-ip-type">Number</option></select><i class="fa-solid fa-trash"></i></div></div><button class="submit-but add-but add-item" id="add-item" type="button">Add info item</button>    <button class="submit-but add-but add-group" type="button">Add group item</button></div>'
  );
});

jq(document).on("click", "#del-addgroup", function () {
  jq(".group-container").append(
    '<div class="group-item"><p class="gr-head">Group Item_ 20215308</p><div class="info-container"><div class="info-box"><label for="" class="info-label">Item info name: </label><div class="info-input">Nội dung</div><select name="type-input" id="" class="type-input"><option value="text" class="opt-ip-type">Text</option><option value="email" class="opt-ip-type">Email</option><option value="number" class="opt-ip-type">Number</option></select><i class="fa-solid fa-trash"></i></div></div><button class="submit-but add-but add-item" id="add-item" type="button">Add info item</button>    <button class="submit-but add-but add-group" type="button">Add group item</button></div>'
  );
  jq(this).remove();
  numberGroup++;
});

jq(document).on("dblclick", ".gr-head", function () {
  var jqnewInput = jq("<input>", { class: "gr-head-input", type: "text" });
  jq(this).before(jqnewInput);
  jq(this).remove();
  jqnewInput.focus();
});

// Nhập tên group
jq(document).on("keypress", ".gr-head-input", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Ngăn chặn trình duyệt thực hiện hành động mặc định của phím Enter (thường là submit form)

    let jqNewP = jq("<p>", {
      class: "gr-head",
    });
    if (jq(this).val() != "") jqNewP.text(jq(this).val() + "_20215308");
    else {
      alert("Bạn không được để trống trường thông tin!");
      return;
    }
    jq(this).before(jqNewP);
    jq(this).remove();
  }
});

// Nhập giá trị mục thông tin
jq(document).on("keypress", "input.info-input", function (event) {
  if (event.keyCode === 13) {
    let newDiv = jq("<div>", {
      class: "info-input",
    });
    if (jq(this).val() != "") {
      if (jq(this).siblings('type-input').val() != 'Email' || (jq(this).siblings('.type-input').val() == 'Email' && jq(this).val().indexOf('@') != -1))
        newDiv.text(jq(this).val());
      else {
        alert("Trường thông tin email nhập chưa đúng!");
        return;
      }
    }
    else {
      alert("Bạn không được để trống trường thông tin!");
      return;
    }
    jq(this).before(newDiv);
    jq(this).remove();
  }
});

// Bấm vào nút thùng rác xóa info item
jq(document).on("click", ".fa-solid.fa-trash", function () {
  jq(this).parent().remove();
});

// Xóa group item
jq(document).on("click", ".fa-solid.fa-trash-can", function () {
  const check = confirm(
    "Nguyễn Việt Anh 20215308\nBạn có chắc chắn muốn xóa group item này không?"
  );
  if (check) jq(this).parents(".group-item").remove();
  else return;
});

// double click vào tên mục thông tin để sửa
jq(document).on("dblclick", ".info-label", function () {
  let newInput = jq("<input>", {
    class: "info-label",
  });
  jq(this).before(newInput);
  jq(this).remove();
});

// double click vào giá trị mục thông tin để sửa
jq(document).on("dblclick", "div.info-input", function () {
  let newInput = jq("<input>", {
    class: "info-input",
    type: "text",
  });
  newInput.attr('type', jq(this).siblings('.type-input').val());
  jq(this).before(newInput);
  jq(this).remove();
});

// Xử lý phím enter để kết thúc nhập tên mục thông tin
jq(document).on("keypress", ".info-label", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Ngăn chặn trình duyệt thực hiện hành động mặc định của phím Enter (thường là submit form)

    let jqNewLabel = jq("<label>", {
      class: "info-label",
    });
    if (jq(this).val() != "") jqNewLabel.text(jq(this).val() + ":");
    else {
      alert("Bạn không được để trống trường thông tin!");
      return;
    }
    jq(this).before(jqNewLabel);
    jq(this).remove();
  }
});

// Chọn type cho thẻ input
jq(document).on("change", ".type-input", function () {
  // console.log(jq(this).parents('.type-input').val())
  jq(this).siblings(".info-input").attr("type", jq(this).val());
});

// Xuất file PDF
jq(document).on("click", ".get-pdf", function () {
  let inputInfo = document.querySelectorAll('input.info-input');
  if (inputInfo.length > 0) {
    alert("Bạn còn trường thông tin chưa điền xong!");
    return;
  }
  if (numberGroup == 0) {
    alert(
      "Nguyễn Việt Anh 20215308\nBạn chưa điền trường thông tin nào!"
    );
    return;
  }
  let myInfo = "";
  const groupItems = document.getElementsByClassName("group-item");
  for (let i = 0; i < groupItems.length; i++) {
    const p = groupItems[i].getElementsByClassName("gr-head");
    myInfo += p[0].textContent + "\n";
    const infoBoxs = groupItems[i].getElementsByClassName("info-box");
    for (let j = 0; j < infoBoxs.length; j++) {
      const myLabel = infoBoxs[j].getElementsByClassName("info-label");
      const myInput = infoBoxs[j].getElementsByClassName("info-input");
      if (myInput[0].value != "" && myLabel[0].textContent != "")
        myInfo += "\t" + myLabel[0].textContent + " " + myInput[0].textContent + "\n";
      else {
        alert(`Trường thông tin bạn đang nhập vẫn còn trống`);
        return;
      }
    }
  }
  console.log(myInfo);
  // pdf.text(myInfo, 10, 10);
  const myInfoHTML = document.createElement("pre");
  myInfoHTML.textContent = myInfo;
  myInfoHTML.id = "pdf-info";
  jq(".main").append(myInfoHTML);

  html2canvas(document.querySelector("#pdf-info")).then((canvas) => {
    let pdf = new jsPDF("p", "px");
    let base64image = canvas.toDataURL("image/png");
    pdf.addImage(base64image, "PNG", 10, 10);
    pdf.save("my-information.pdf");
  });
  jq("#pdf-info").remove();
});
