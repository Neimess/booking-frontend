export function handleError(e) {
    console.error(e);
    alert(e.message || 'Unknown error');
  }