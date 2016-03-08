var objList = [];

$(document).ready(function () {
    loadAndAddToList();
    $("#reviewBotn").click(loadAndAddToList);
    $("#btnAdd").click(btnAdd_click);
    $("#btnCheckEdit").click(btnOKOnDetail_click);
    $("#btnHome").click(backHome);
    $("#btnRemove").click(userDeleteItem);
    $("#reviewList #btnEdit").click(userTapholdListItem);
    $("#btnDontCheck").click(backReviewWord)
    //$("#txtName").focus();
});

function showAddNewWord()
{
    $("#addNewWord").show();
    $("#mainPage").hide();
}

function showReviewWord()
{
    $("#reviewWord").show();
    $("#mainPage").hide();
}

function backHome()
{
    $("#mainPage").show();
    $("#addNewWord").hide();
    $("#reviewWord").hide();
}

function backReviewWord() {
    $("#reviewWord").show();
    $("#editWordPage").hide();
}


function btnAdd_click() {
    var sWord = $("#txtWord").val();
    var sSentence = $("#txtSentence").val();
    var sTranslate = $("#txtTranslate").val();
    var sTxtInfo = $("#txtInfo").val();

    //for (var i = 0; i < objList.length; i++) {
    //    if (objList[i].word == sWord) {
    //        $("#txtWord").focus();
    //        return;
    //    }
    //}

    var objItem = {};
    objItem.word = sWord;
    objItem.sentence = sSentence;
    objItem.translate = sTranslate;
    objItem.txtInfo = sTxtInfo;
    objList.push(objItem);
    saveData();
    addToList(objItem);
    $("#txtWord").val("");
    $("#txtSentence").val("");
    $("#txtTranslate").val("");
    $("#txtInfo").val("");
    var t = sWord + "，新增成功";
    $("#sendMessage").innerText += t;
    //startObjMessage('objDiv');
    $("#txtName").focus();
}

function addToList(objItem) {
    $("#liTemplate").tmpl().appendTo("#reviewList").trigger('create');
    //$("#reviewList").listview("refresh");
    //$("#reviewList li").hide();
    $("#reviewList h1").eq(objList.length - 1).text(objItem.word);
    $("#reviewList #liSentence").eq(objList.length - 1).text(objItem.sentence);
    $("#reviewList #liTranslate").eq(objList.length - 1).text(objItem.translate);
    $("#reviewList #liInfo").eq(objList.length - 1).text(objItem.txtInfo);
    $("#reviewList li").eq(0).show();
    //if ((objList.length - 1) == 0)
    //{
    //    $("#reviewList li").eq(objList.length - 1).show();
    //}

    $("#reviewList li").eq(objList.length - 1).on("swipeleft", userSwipeListToLeft);
    $("#reviewList li").eq(objList.length - 1).on("swiperight", userSwipeListToRight);
    //$("#reviewList select").eq(objList.length - 1).val(objItem.select).slider("refresh");
    //$("#reviewList select").eq(objList.length - 1).change(
    //		userSwitchBuyOption);
    //$("#reviewList li").eq(objList.length - 1).on("swipe", userSwipeListItem);
    $("#reviewList li").eq(objList.length - 1).on("taphold", userTapholdListItem);
    $("#reviewList #btnEdit").click(userTapholdListItem);
}


function saveData() {
    localStorage.setItem("ReviewList", JSON.stringify(objList));
}


function loadAndAddToList() {
    if (localStorage.length <= 0)
        return;
    $("#reviewList").html("");
    objStoredList = eval("(" + localStorage["ReviewList"] + ")");
    for (var i = 0; i < objStoredList.length; i++) {
        var objItem = objStoredList[i];
        objList.push(objItem);
        addToList(objItem);
    }
}

function userDeleteItem(e) {
    var i = $(this).index();
    //var i = $("#reviewList li").eq(objList.length - 1).index();
    objList.splice(i, 1);
    saveData();
    objList = [];
    loadAndAddToList();
}


function userSwipeListItem(e) {
    var i = $(this).index();
    objList.splice(i, 1);
    saveData();
    objList = [];
    loadAndAddToList();
}

function userSwipeListToLeft(e) {
    var i = $(this).index();
    if (i < objList.length){
        $("#reviewList li").eq(i).hide();
        $("#reviewList li").eq(i + 1).show();
    }
}

function userSwipeListToRight(e) {
    var i = $(this).index();
    if (i != 0){
        $("#reviewList li").eq(i).hide();
        $("#reviewList li").eq(i - 1).show();
    }


}

function userTapholdListItem(e) {
    var i = $(this).index();
    if(i!=0){
    $("#editWord").val(objList[i].word);
    $("#editSentence").val(objList[i].sentence);
    $("#editTranslate").val(objList[i].translate);
    $("#editInfo").val(objList[i].txtInfo);
    $("#idIndexOnDetail").val(i);
    $("#editWordPage").show();
    $("#reviewWord").hide();
    }
}


function btnOKOnDetail_click(e) {
    var sWord = $("#editWord").val();
    var sSentence = $("#editSentence").val();
    var sTranslate = $("#editTranslate").val();
    var sTxtInfo = $("#editInfo").val();
    
    var i = $("#idIndexOnDetail").val();
    var objItem = {};
    objItem.word = sWord;
    objItem.sentence = sSentence;
    objItem.translate = sTranslate;
    objItem.txtInfo = sTxtInfo;
    objList.push(objItem);
    saveData();
    $("#reviewList h1").eq(i).text(sWord);
    $("#reviewList #liSentence").eq(i).text(sSentence);
    $("#reviewList #liTranslate").eq(i).text(sTranslate);
    $("#reviewList #liInfo").eq(i).text(sTxtInfo);
    $("#editWordPage").hide();
    $("#reviewWord").show();
}

