var myLeads = []

const inputEl = document.getElementById("input-el")

const inputBtn = document.getElementById("input-btn")

const ulEL = document.getElementById("ul-el")

const deleteBtn = document.getElementById("delete-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads();
  }


tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads();
    });
});

  
function renderLeads() {
    let listItems = ""

    for (i=0; i < myLeads.length; i++ ){
        listItems += `
            <li>
                <a target ='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEL.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    renderLeads();
});

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value=""


localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads();
});






