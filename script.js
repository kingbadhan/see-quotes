let btn = document.querySelector("button");
let hed = document.querySelector("h3");
let url = "http://universities.hipolabs.com/search?name=";

btn.addEventListener("click", async () => {
  let country = document.querySelector("input").value;
  let colArr = await getColleges(country);
  hed.innerText = `The List of Colleges of ${country}`;
  console.log(colArr);
  show(colArr);
})


function show(colArr){
  let list = document.querySelector("#list");
  list.innerHTML = "";
  for(let col of colArr){
    let li = document.createElement("li");
    li.innerText = col.name;
    list.appendChild(li);
  }
}

async function getColleges(country) {
  try {
    let res = await axios.get(url + country);
    return res.data;
  } catch (e) {
    console.log("error: ", e);
    return "/";
  }
}