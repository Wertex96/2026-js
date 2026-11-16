const addFormBtn = document.getElementById('add-form-btn');
const firstForm = document.querySelector('.password-form');
const formTemplate = firstForm.cloneNode(true);

function initForm(form) {
    const input = form.querySelector('.password-input');
    const output = form.querySelector('.password-output');
    const checkboxes = form.querySelectorAll('.vowels-area input');
    const toggleBtn = form.querySelector('.show-toggle');
    const deleteBtn = form.querySelector('.delete-form');

    function update() {
        let text = input.value;

        for (let box of checkboxes) {
            if (box.checked) {
                let letter = box.dataset.vowel;
                text = text.replaceAll(letter, '*');
                text = text.replaceAll(letter.toUpperCase(), '*');
            }
        }

        output.textContent = text;
    }

    toggleBtn.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggleBtn.textContent = isPassword ? '🙈 Скрыть' : '👁️ Показать';
    });

    deleteBtn.addEventListener('click', () => {
        const allForms = document.querySelectorAll('.password-form');
        
        if (allForms.length > 1) {
            form.remove();
        } else {
            input.value = '';
            checkboxes.forEach(cb => cb.checked = false);
            update();
        }
    });

    input.addEventListener('input', update);
    checkboxes.forEach(box => box.addEventListener('change', update));
}

initForm(firstForm);

addFormBtn.addEventListener('click', () => {
    const newForm = formTemplate.cloneNode(true);
    
    addFormBtn.insertAdjacentElement('beforebegin', newForm);
    
    initForm(newForm);
});
