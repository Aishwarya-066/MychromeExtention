 /*
        function save(){
        ------
        }*/
        let leads = []

        const inputEl = document.getElementById("input-el")
        const inputBtn = document.getElementById("input-btn")
        const ulEl = document.getElementById("ul-el")
        const deleteBtn = document.getElementById("delete-btn")
        const tabBtn = document.getElementById("tab-btn")
       // const tab = [{url: "https://www.linkedin.com/in/per-harald-borgen/"}]
       tabBtn.addEventListener("click", function(){    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            leads.push(tabs[0].url)
            localStorage.setItem("leads", JSON.stringify(leads))
            render(leads)
        })
    })
        const leadsFromLocalStorage = JSON.parse( localStorage.getItem("leads") )
        if (leadsFromLocalStorage) {
            leads = leadsFromLocalStorage
            render(leads)
        }

        deleteBtn.addEventListener("dblclick", function(){
            localStorage.clear()
            leads = []
            render(leads)
        })
        inputBtn.addEventListener("click",function(){
            leads.push(inputEl.value)
            inputEl.value = ""
            localStorage.setItem("leads", JSON.stringify(leads) )
            render(leads)
        })

        function render(myleads){
            let listItems = ""
        for (let i = 0; i < myleads.length; i++) {
 //  listItems += "<li><a target='_blank' href='" + leads[i] + "'></a></li>"
   /*const li = document.createElement("li")
    li.textContent = leads[i]
    ulEl.append(li)*/
    //template string
    listItems += `
            <li>
                <a target="_blank" href="${myleads[i]}">  ${myleads[i]} </a>
            </li>
    `
}
ulEl.innerHTML = listItems
        }

        /*
        let myLeads = `["www.awesomelead.com"]`

// 1. Turn the myLeads string into an array
myLeads = JSON.parse(myLeads)
// 2. Push a new value to the array
myLeads.push("www.lead2.com")
// 3. Turn the array into a string again
myLeads = JSON.stringify(myLeads)
// 4. Console.log the string using typeof to verify that it's a string
console.log(typeof myLeads)

        */