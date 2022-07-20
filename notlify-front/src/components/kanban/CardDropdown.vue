<template>
	<div class="menu-dropdown">
		<slot name="title" />
		<ul class="list">
			<slot name="list" />
		</ul>
	</div>
</template>

<script>
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
}

export default {
	props: {
		pos: {
			type: String
		}
	},
	created () {
		window.addEventListener('resize', this.onResize);
	},
	destroyed () {
		window.removeEventListener('resize', this.onResize);
	},
	mounted () {
		let elem = document.getElementsByClassName('menu-dropdown')[0]
		let rect = elem.getBoundingClientRect()
		if (this.pos === 'top') {
			this.setTop(elem, rect)
		} else if (this.pos === 'bottom') {
			this.setBottom(elem, rect)
		} else if (this.pos === 'right') {
			this.setRight(elem, rect)
		} else if (this.pos === 'left') {
			this.setLeft(elem, rect)
		}
		// check if the "menu-dropdown" is in viewport
		if (!isInViewport(elem)) {
			let triggeringElem = elem.closest('.popover')
			let rectTriggeringElem = triggeringElem.getBoundingClientRect()
			if ((rect.bottom > window.innerHeight) || (window.innerHeight < (rectTriggeringElem.bottom + rect.height))) {
				// condition to not let the popover element cross the view port
				if (window.innerHeight > (rect.height + 40)) {
					elem.style.top = `${window.innerHeight - rectTriggeringElem.bottom - rect.height}px`
				}					
			}
			if ((rect.right > window.innerWidth) || (window.innerWidth < (rectTriggeringElem.right + rect.width))) {
				if (window.innerWidth > (rect.width + 20)) {
					elem.style.left = `${window.innerWidth - rectTriggeringElem.right - rect.width}px`
				}
			}
		}
	},
	methods: {
		setTop (elem, rect) {
			let topPosition = (rect.height + 10) * -1
			elem.style.top = `${topPosition}px`
		},
		setBottom (elem, rect) {
			let topPosition = 25
			elem.style.top = `${topPosition}px`
		},
		setRight (elem, rect) {
			let leftPosition = 25
			let topPosition = 0
			elem.style.left = `${leftPosition}px`
			elem.style.top = `${topPosition}px`
		},
		setLeft (elem, rect) {
			let leftPosition = (rect.width + 10) * -1
			let topPosition = 0
			elem.style.left = `${leftPosition}px`
			elem.style.top = `${topPosition}px`
		},
		onResize (e) {
			if (document.getElementsByClassName('menu-dropdown')[0]) {
				let elem = document.getElementsByClassName('menu-dropdown')[0]
				let rect = elem.getBoundingClientRect()
				let triggeringElem = elem.closest('.popover')
				let rectTriggeringElem = triggeringElem.getBoundingClientRect()
				if ((rect.bottom > window.innerHeight) || (window.innerHeight < (rectTriggeringElem.bottom + rect.height))) {
					// condition to not let the popover element cross the view port
					if (window.innerHeight > (rect.height + 40)) {
						elem.style.top = `${window.innerHeight - rectTriggeringElem.bottom - rect.height}px`
					}					
				}
				if ((rect.right > window.innerWidth) || (window.innerWidth < (rectTriggeringElem.right + rect.width))) {
					if (window.innerWidth > (rect.width + 20)) {
						elem.style.left = `${window.innerWidth - rectTriggeringElem.right - rect.width}px`
					}
				}
			}
		}
	}
}
</script>