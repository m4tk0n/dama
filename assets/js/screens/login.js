export function mount({root}) {
  const dialog=root.querySelector('dialog');
  if(dialog && !dialog.open) dialog.showModal();
  dialog?.addEventListener('close',()=>root.replaceChildren());
}