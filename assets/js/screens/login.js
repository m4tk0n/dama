export function mount({root,navigate}) {
  const dialog=root.querySelector('dialog');
  if(!dialog)return;
  dialog.removeAttribute('open');
  dialog.showModal();
  dialog.addEventListener('close',()=>navigate('home'));
}