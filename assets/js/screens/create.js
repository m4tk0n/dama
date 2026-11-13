export function mount({navigate,root}) {
  const difficultyGroup=root.querySelector('#difficulty-group');
  const update=()=>{difficultyGroup.hidden=root.querySelector('input[name="opponent"]:checked')?.value!=='ai'};
  root.querySelectorAll('input[name="opponent"]').forEach(input=>input.addEventListener('change',update));
  root.querySelector('[data-action="start-local"]').addEventListener('click',()=>{
    const opponent=root.querySelector('input[name="opponent"]:checked')?.value||'human';
    const difficulty=root.querySelector('input[name="difficulty"]:checked')?.value||'easy';
    navigate('game',{opponent,difficulty});
  });
  update();
}