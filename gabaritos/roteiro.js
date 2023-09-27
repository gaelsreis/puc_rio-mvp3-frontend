/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/produtos';
  fetch(url, {method: 'get',})
    .then((response) => response.json())
    .then((data) => {data.produtos.forEach(item => insertList(item.tac, item.nome, item.quantidade, item.valor))})
    .catch((error) => {console.error('Error:', error);});
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item da lista no servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputTac, inputProduct, inputQuantity, inputPrice) => {
  const formData = new FormData();
  formData.append('tac', inputTac);
  formData.append('nome', inputProduct);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputPrice);

  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {method: 'post', body: formData})
    .then((response) => response.json())
    .catch((error) => {console.error('Error:', error);});
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um checkbox para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertCheck = (parent, bool) => {
  let label = document.createElement("label");
  label.className = "tac";

  let check = document.createElement("input");
  check.className = "novotac";
  check.type = "checkbox";
  check.id = "novoTac";
  check.checked = bool;

  label.appendChild(check);
  parent.appendChild(label);
  updateElement();
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar um item da lista de acordo com o click no checkbox
  --------------------------------------------------------------------------------------
*/
const updateElement = () => {
  let novotac = document.getElementsByClassName("tac");
  let i;
  for (i = 0; i < novotac.length; i++) {
    novotac[i].onclick = function () {
      
      let tachado = this.parentElement.parentElement;
      if (tachado.className == "tachado") {tachado.className = "naoTachado";}
      else {tachado.className = "tachado";}

      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML;
      updateItem(nomeItem)
    }
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para alterar um item da lista no servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const updateItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/tac?nome=' + item;
  fetch(url, {method: 'put'})
    .then((response) => response.json())
    .catch((error) => {console.error('Error:', error);});
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão excluir para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  span.className = "excluir";
  let fechar = document.createElement("button");
  fechar.id = "excluir";
  span.appendChild(fechar);
  parent.appendChild(span);
  removeElement();
}


/*
  --------------------------------------------------------------------------------------
  Função para remover todos os itens da lista de acordo com o click no botão excluir
  --------------------------------------------------------------------------------------
*/
const removeAll = () => {
  var corpo = document.getElementById("minhaLista").rows;
  while(corpo.length>0) corpo[0].parentNode.removeChild(corpo[0]);
  deleteAll();
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar todos os itens da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteAll = () => {
  console.log("Limpar lista")
  let url = 'http://127.0.0.1:5000/limpeza';
  fetch(url, {method: 'delete'})
    .then((response) => response.json())
    .catch((error) => {console.error('Error:', error);});
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão excluir
  --------------------------------------------------------------------------------------
*/
function removeElement() {
  let close = document.getElementsByClassName("excluir");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML;
      div.remove();
      deleteItem(nomeItem);
    };
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/produto?nome=' + item;
  fetch(url, {method: 'delete'})
    .then((response) => response.json())
    .catch((error) => {console.error('Error:', error);});
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE pelo Id
  --------------------------------------------------------------------------------------
*/
const deleteItemId = (idItem) => {
  console.log(idItem)
  let url = 'http://127.0.0.1:5000/produto?id=' + idItem;
  fetch(url, {method: 'delete'})
    .then((response) => response.json())
    .catch((error) => {console.error('Error:', error);});
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const novoItem = () => {
  let inputTac = 0;
  let inputProduct = document.getElementById("novoNome").value;
  let inputQuantity = document.getElementById("novaQtde").value;
  let inputPrice = document.getElementById("novoPreco").value;

  if (inputProduct === '') {
    alert("Escreva o nome de um item!");
  } else if (isNaN(inputQuantity)) {
    alert("Quantidade precisa ser número!");
  } else {
    insertList(inputTac, inputProduct, inputQuantity, inputPrice)
    postItem(inputTac, inputProduct, inputQuantity, inputPrice)
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir itens na lista
  --------------------------------------------------------------------------------------
*/
const insertList = (tac, nameProduct, quantity, price) => {

  var item = [tac, nameProduct, quantity, price];
  var table = document.getElementById("minhaLista");
  var row = table.insertRow();

  console.log(item);

  document.getElementById("novoNome").value = "";
  document.getElementById("novaQtde").value = "";
  document.getElementById("novoPreco").value = "";

  for (var i = 0; i < item.length-1; i++) {
    var cel = row.insertCell(i)
    cel.textContent = item[i+1];
    cel.id = "valores"
  }

  if (item[0] == true) {row.className = "tachado";}
  else {row.className = "naoTachado";}

  insertCheck(row.insertCell(0), tac);
  insertButton(row.insertCell(4));
}