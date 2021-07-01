// メモを保存するデータ
let memos = {
    data: []
}

// すでにデータがあれば上書き
if (localStorage.getItem('memo')) {
    memos = JSON.parse(localStorage.getItem('memo'));
}

// 保存ボタンを押したときの処理
const saveButton = document.querySelector('#save_button')
saveButton.addEventListener('click', function() {
    const title = document.querySelector('#title')
    const textarea = document.querySelector('#memo')
    memos['data'].push({
        title: title.value,
        text: textarea.value
    });
    localStorage.setItem('memo', JSON.stringify(memos));
})

// 画面読み込み後の処理
window.onload = function() {
    const memo = JSON.parse(localStorage.getItem('memo'));
    const textarea = document.querySelector('#memo')
    const titles = document.querySelector('#titles')

    // タイトルの一覧を作成
    memo.data.forEach( _memo => {
        const li = document.createElement('li')
        li.innerText = _memo.title
        titles.appendChild(li)
    });

    // タイトルをクリックしたときの処理
    titles.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', elem => {
            const data = memo.data.filter(_memo => _memo.title === elem.target.textContent)
            if (data) {
                title.value = data[0].title
                textarea.value = data[0].text
            }
        })
    })
}