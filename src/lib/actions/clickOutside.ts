export function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (!node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('clickoutside'));
      }
    };
  
    document.addEventListener('mousedown', handleClick, true);
  
    return {
      destroy() {
        document.removeEventListener('mousedown', handleClick, true);
      }
    };
  }