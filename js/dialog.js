const template = `
<div class="modal-x">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="modal-header"></div>
    <div class="modal-body"></div>
    <div class="modal-footer"></div>
  </div>
</div>
`

class Dialog {
  static show(type, header, message, buttonTexts) {
    return new Promise(resolve => {
      //DOM追加
      const rawModal = document.createElement('div')
      document.body.appendChild(rawModal)
      rawModal.outerHTML = template
      //rawModalに対してclassListとかが使えないっぽいので取り直し
      const modal = document.querySelector('div.modal-x:last-child')

      modal.querySelector('div.modal-content').classList.add(type)
      modal.querySelector('div.modal-header').textContent = header
      modal.querySelector('div.modal-body').textContent = message

      const footer = modal.querySelector('div.modal-footer')
      buttonTexts.forEach((text, index) => {
        const button = document.createElement('button')
        button.classList.add('button')
        button.textContent = text

        button.addEventListener(
          'click',
          () => {
            modal.remove()
            resolve(index)
          },
          false
        )
        footer.appendChild(button)
      })

      //classを付け替えて表示
      modal.classList.remove('modal-x')
      modal.classList.add('modal')
    })
  }

  static alert(message) {
    return Dialog.show('modal-danger', '警告', message, ['OK']).then(() => true)
  }

  static success(message) {
    return Dialog.show('modal-success', '情報', message, ['OK']).then(
      () => true
    )
  }

  static confirm(message) {
    return Dialog.show('modal-info', '確認', message, ['はい', 'いいえ']).then(
      index => index === 0
    )
  }
}
