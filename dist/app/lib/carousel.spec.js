import test from 'ava'
import carousel from './carousel'

function createEl() {
  const markup = `
    <div id="my-el">
      <img src="http://lorempixel.com/800/800/sports/5" />
      <img src="http://lorempixel.com/800/800/sports/4" />
      <img src="http://lorempixel.com/800/800/sports/3" />
      <img src="http://lorempixel.com/800/800/sports/2" />
    </div>
  `
  const el = document.createElement('div')
  el.innerHTML = markup
  return el.firstElementChild
}

test('Basic parameters', t => {
  const myContainer = createEl()
  carousel({
    el: myContainer
  })

  t.pass('It runs when no parameter other than el is passed')
})
