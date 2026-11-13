export function mount({navigate,root}) {
  const difficultyGroup=root.querySelector('#difficulty-group');
  const updateDifficulty=()=>{difficultyGroup.hidden=root.querySelector('input[name="opponent"]:checked')?.value!=='ai'};
  root.querySelectorAll('input[name="opponent"]').forEach(input=>input.addEventListener('change',updateDifficulty));

  const select=root.querySelector('#game-variant');
  if(select){
    const wrapper=document.createElement('div');
    wrapper.className='custom-select';
    const label=root.querySelector('label[for="game-variant"]');
    if(label){label.id='game-variant-label';label.htmlFor='game-variant-custom-trigger'}
    select.classList.add('variant-native-select');
    select.setAttribute('aria-hidden','true');
    select.tabIndex=-1;

    const trigger=document.createElement('button');
    trigger.type='button';
    trigger.id='game-variant-custom-trigger';
    trigger.className='custom-select-trigger';
    trigger.setAttribute('aria-haspopup','listbox');
    trigger.setAttribute('aria-expanded','false');
    trigger.setAttribute('aria-controls','game-variant-listbox');
    if(label)trigger.setAttribute('aria-labelledby','game-variant-label');
    const triggerText=document.createElement('span');
    const arrow=document.createElement('span');
    arrow.setAttribute('aria-hidden','true');
    arrow.textContent='▾';
    trigger.append(triggerText,arrow);

    const list=document.createElement('div');
    list.id='game-variant-listbox';
    list.className='custom-select-list';
    list.setAttribute('role','listbox');
    list.setAttribute('aria-labelledby','game-variant-label');
    list.hidden=true;

    const optionButtons=[];
    const syncSelection=()=>{
      const selected=select.options[select.selectedIndex];
      triggerText.textContent=selected?.textContent?.trim()||'Vyberte variantu';
      optionButtons.forEach((button,index)=>{
        const option=select.options[index];
        button.setAttribute('aria-selected',String(option===selected));
      });
    };
    const close=({restoreFocus=false}={})=>{
      list.hidden=true;
      trigger.setAttribute('aria-expanded','false');
      if(restoreFocus)trigger.focus();
    };
    const open=()=>{
      list.hidden=false;
      trigger.setAttribute('aria-expanded','true');
      const selectedIndex=select.selectedIndex;
      const target=optionButtons[selectedIndex]?.disabled
        ? optionButtons.findIndex(button=>!button.disabled)
        : selectedIndex;
      if(target>=0)optionButtons[target].focus();
    };
    const focusOption=(start,direction)=>{
      let index=start;
      while(index>=0&&index<optionButtons.length){
        if(!optionButtons[index].disabled){optionButtons[index].focus();return}
        index+=direction;
      }
    };

    Array.from(select.children).forEach(group=>{
      if(group.tagName==='OPTGROUP'){
        const groupLabel=document.createElement('div');
        groupLabel.className='custom-select-group-label';
        groupLabel.setAttribute('role','presentation');
        groupLabel.textContent=group.label;
        list.append(groupLabel);
        Array.from(group.children).forEach(option=>addOption(option));
      }else if(group.tagName==='OPTION')addOption(group);
    });
    function addOption(option){
      const button=document.createElement('button');
      button.type='button';
      button.className='custom-select-option';
      button.setAttribute('role','option');
      button.textContent=option.textContent.trim();
      button.disabled=option.disabled;
      button.setAttribute('aria-selected',String(option.value===select.value));
      button.addEventListener('click',()=>{
        if(option.disabled)return;
        select.value=option.value;
        select.dispatchEvent(new Event('change',{bubbles:true}));
        syncSelection();
        close({restoreFocus:true});
      });
      button.addEventListener('keydown',event=>{
        const index=optionButtons.indexOf(button);
        if(event.key==='ArrowDown'){event.preventDefault();focusOption(index+1,1)}
        else if(event.key==='ArrowUp'){event.preventDefault();focusOption(index-1,-1)}
        else if(event.key==='Home'){event.preventDefault();focusOption(0,1)}
        else if(event.key==='End'){event.preventDefault();focusOption(optionButtons.length-1,-1)}
        else if(event.key==='Escape'){event.preventDefault();close({restoreFocus:true})}
        else if(event.key==='Tab')close();
      });
      optionButtons.push(button);
      list.append(button);
    }

    trigger.addEventListener('click',()=>list.hidden?open():close());
    trigger.addEventListener('keydown',event=>{
      if(['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){
        event.preventDefault();
        if(list.hidden)open();
      }else if(event.key==='Escape')close();
    });
    document.addEventListener('click',event=>{
      if(!wrapper.contains(event.target))close();
    });
    wrapper.append(trigger,list);
    select.insertAdjacentElement('afterend',wrapper);
    syncSelection();
  }

  root.querySelector('[data-action="start-local"]').addEventListener('click',()=>{
    const opponent=root.querySelector('input[name="opponent"]:checked')?.value||'human';
    const difficulty=root.querySelector('input[name="difficulty"]:checked')?.value||'easy';
    const variant=root.querySelector('#game-variant')?.value||'czech-8';
    const playableVariants=['classic','giveaway','czech-8','czech-zapletal'];
    if(!playableVariants.includes(variant))return;
    navigate('game',{opponent,difficulty,variant});
  });
  updateDifficulty();
}
