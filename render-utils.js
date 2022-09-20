export function renderWitch(witch) {
    const li = document.createElement('li');
    li.classList.add('witch', 'card');

    const hp = document.createElement('span');
    hp.classList.add('stat');
    hp.textContent = witch.hp;

    const image = document.createElement('img');
    image.alt = witch.type;
    if (witch.hp < 1) {
        image.src = `/assets/witch2.png`;
    } else {
        image.src = `assets/${witch}.png`;
    }

    const name = document.createElement('span');
    name.classList.add('name');
    name.textContent = witch.name;

    li.append(hp, image, name);

    return li;
}
