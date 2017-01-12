function ajaxPost(url, data) {
    var areq = new XMLHttpRequest();
    areq.onreadystatechange = function() {
        if (areq.readyState == 4 && areq.status == 200) {
            return areq.response;
        }
    }
    areq.open('post', url);
    areq.send(JSON.stringify(data));
}

var submit = document.getElementById('submitComment');
submit.addEventListener('click', function(event) {
    event.preventDefault();
    var formElements = document.getElementsByClassName('formEl');
    console.log('FOrm els ', formElements);
    var obj = {};
    for (var i = 0; i < formElements.length; i++) {
        var name = formElements[i].name;
        var val = formElements[i].value;
        obj[name] = val; 
    }
    console.log(obj);

    ajaxPost('/api/comment', obj);
});