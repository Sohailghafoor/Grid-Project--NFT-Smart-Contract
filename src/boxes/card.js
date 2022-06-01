let card = [];

export function setCard(name, bio, link, image) {
  card.push({
    name: name,
    bio: bio,
    link: link,
    image: image,
  });
}

export function getCard() {
  return card;
}
