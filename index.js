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

    // 画面の要素を追加する
    const li = document.createElement('li')
    li.innerText = title.value
    li.dataset.index = memos['data'].length - 1

    // liタグをクリックした時にフォームに内容を表示する
    li.addEventListener('click', elem => {
        const memoIndex = elem.target.dataset.index
        document.querySelector('#memo-index').value = memoIndex
        const memo = JSON.parse(localStorage.getItem('memo'));
        const data = memo.data[memoIndex]
        if (data) {
            title.value = data.title
            textarea.value = data.text
        }
    })
 
    const titles = document.querySelector('#titles')
    titles.appendChild(li)
})

// 画面読み込み後の処理
window.onload = function() {
    const memo = JSON.parse(localStorage.getItem('memo'));
    const title = document.querySelector('#title')
    const textarea = document.querySelector('#memo')
    const titles = document.querySelector('#titles')

    // タイトルの一覧を作成
    memo.data.forEach( (_memo, index) => {
        const li = document.createElement('li')
        li.innerText = _memo.title
        li.dataset.index = index
        titles.appendChild(li)
    });

    // タイトルをクリックしたときの処理
    titles.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', elem => {
            const memoIndex = elem.target.dataset.index
            document.querySelector('#memo-index').value = memoIndex
            const data = memo.data[memoIndex]
            if (data) {
                title.value = data.title
                textarea.value = data.text
            }
        })
    })

    const deleteButton = document.querySelector('#delete_button');
    deleteButton.addEventListener('click', () => {
        const memoIndex = document.querySelector('#memo-index').value
        // メモを削除
        memos.data.splice(memoIndex, 1)
        // ローカルストレージを更新
        localStorage.setItem('memo', JSON.stringify(memos));
        // liタグを削除
        titles.querySelectorAll('li')[memoIndex].remove();
        // フォームを初期化
        title.value = "";
        textarea.value = "";
    })
}