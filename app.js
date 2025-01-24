const REGEX_NAME = /^[a-zA-Z\s]{3,}$/;
const ERROR_NAME_MESSAGE = `<h3>Erro!</h3><p>Nome inválido. Insira um nome com no mínimo 3 letras.</p>`;
const END_GAME_MESSAGE = `<h3>Fim de jogo!</h3><p>Lista de amigos vazia.</p>`;

let friendsList = [];

const inputFriendField = document.querySelector("#inputFriend");
const friendsListDiv = document.querySelector("#friendsList");
const hitFriendListDiv = document.querySelector(".friendsList-small-text");

const modal = document.querySelector("#modal");
const modalMessage = document.querySelector("#modalMessage");

/**
 * Função que exibe o modal.
 * @param {string} content Conteúdo a ser exibido no modal.
 * @returns {void}
 *
 */
const openModal = (content) => {
  modalMessage.innerHTML = content;
  modal.classList.add("show");
};

/**
 * Função que fecha o modal.
 * @returns {void}
 *
 */
const closeModal = () => modal.classList.remove("show");

/**
 *
 * Função que valida o nome do amigo a ser adicionado.
 * @param {string} name Nome do amigo a ser validado.
 * @returns {boolean} Retorna true se o nome for válido e false se não for.
 *
 * @example
 * isValidName("João"); // true
 * isValidName("234"); // false
 */
const isValidName = (name) => REGEX_NAME.test(name);

/**
 * Função que adiciona um amigo à lista de amigos.
 * @param {string} name Nome do amigo a ser adicionado.
 * @returns {void}
 *
 * @example
 * addFriend("João");
 * addFriend("Maria");
 * addFriend("José");
 */
const addFriend = (name) => friendsList.push(name);

/**
 * Função que remove um amigo da lista de amigos.
 * @param {string} name Nome do amigo a ser removido.
 * @returns {void}
 *
 * @example
 * removeFriend("João");
 * removeFriend("Maria");
 * removeFriend("José");
 *
 */
const removeFriend = (name) => {
  const index = friendsList.indexOf(name);
  if (index !== -1) friendsList.splice(index, 1);
};

/**
 *  Função que exibe uma mensagem de confirmação e remove um amigo da lista.
 * @returns {void}
 *
 */
const handleAddFriend = () => {
  const name = inputFriendField.value.trim();
  if (!isValidName(name)) return openModal(ERROR_NAME_MESSAGE);

  addFriend(name);
  const friend = document.createElement("li");
  friend.innerText = name;
  friendsListDiv.appendChild(friend);

  inputFriendField.value = "";
};

/**
 * Função que sorteia um amigo secreto da lista de amigos e exibe o nome em um modal.
 * Se a lista de amigos estiver vazia, exibe uma mensagem de fim de jogo.
 * @returns {void}
 *
 */
const handleDrawFriend = () => {
  if (!friendsList.length) return openModal(END_GAME_MESSAGE);

  const randomFriend = friendsList.splice(
    Math.floor(Math.random() * friendsList.length),
    1
  )[0];
  let content = `<h3>Você tirou:</h3><h1 class="drawFriendName">${randomFriend}</h1>`;
  openModal(content);
};
