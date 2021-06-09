const saveButton = document.querySelector('#save_button')
saveButton.addEventListener('click', function() {
    const textarea = document.querySelector('#memo')
    localStorage.setItem('memo', textarea.value);
})

window.onload = function() {
    const memo = localStorage.getItem('memo');
    const textarea = document.querySelector('#memo')
    textarea.value = memo
}