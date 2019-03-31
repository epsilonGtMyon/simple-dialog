const Loading = (() => {
  let count = 0
  const template = `
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="loader-mark"></div>
    </div>
  </div>
`

  class Loading {
    static show() {
      count++
      if (count > 1) {
        return
      }
      
      const loading = document.createElement('div')
      document.body.appendChild(loading)
      loading.outerHTML = template
    }

    static dissmiss() {
      count--
      if (count > 0) {
        return
      }
      
      const loading = document.querySelector('div.modal:last-child')
      loading.remove()
    }
  }

  return Loading
})()
