export function mount({navigate,root}) {
  const difficultyGroup=root.querySelector('#difficulty-group');
  const update=()=>{difficultyGroup.hidden=root.querySelector('input[name="opponent"]:checked')?.value!=='ai'};
  root.querySelectorAll('input[name="opponent"]').forEach(input=>input.addEventListener('change',update));
  root.querySelector('[data-action="start-local"]').addEventListener('click',()=>{
    const opponent=root.querySelector('input[name="opponent"]:checked')?.value||'human';
    const difficulty=root.querySelector('input[name="difficulty"]:checked')?.value||'easy';
    const variant=root.querySelector('#game-variant')?.value||'czech-8';
    const playableVariants=['classic','giveaway','czech-8','czech-zapletal'];
    if(!playableVariants.includes(variant))return;
    navigate('game',{opponent,difficulty,variant});
  });
  update();
}
