import './_style.scss'
import { createElement, safeQuerySelector } from '../../common/utils'
import { IComponent } from '../../types'

export default class Header implements IComponent {
  render() {
    const footerDOMLink = safeQuerySelector('footer')
    const wrapper = createElement({ tagName: 'div', classes: 'wrapper' })

    const template = `
    <a href="https://github.com/PavelZabalotny" class="footer__github github" target="_blank">
      <span class="github__logo"></span> <span class="github__name">Pavel Zabalotny</span>
    </a>
    <div class="footer__year">2022</div>
    <a href="https://rs.school/js/" class="footer__rs" target="_blank"></a>
    `
    wrapper.insertAdjacentHTML('beforeend', template)

    footerDOMLink.append(wrapper)
  }
}
