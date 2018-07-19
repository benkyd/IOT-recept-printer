async function print() {
    let name = document.getElementById('name').value;
    let coords = document.getElementById('coords').value;

    if (name == '' || coords == '') {
        alert('One of the fields is empty');
        return;
    }

    let http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        let response = this.responseText;
        document.getElementById('response').innerHTML = 'Server responded with: ' + response;
    }
    
    let string = '/print?name=' + name + '&coords=' + coords;
    await http.open('GET', string, true);
    await http.send();

    document.getElementById('coords').value = '';
    document.getElementById('name').value = '';
    document.getElementById('response').innerHTML = 'Printing...'
}