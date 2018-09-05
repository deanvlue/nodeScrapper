const puppeteer = require ('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    //await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');

    //queremos saber el nombre ye el precio del libro
    const result = await page.evaluate(()=>{
        //return somethingi
        let infoBooks = [];
        document.querySelectorAll('.product_pod').forEach((h)=>{
            //titulos.push(h.firstChild.attributes[1].nodeValue);
            //titulos.push(h.children)
            let datos={};
            datos.titulo = h.children[2].firstChild.attributes[1].nodeValue;
            datos.precio = h.children[3].children[0].innerText;

            infoBooks.push(datos);

        });

        // console.log(elementos);
        //let title = document.querySelector('h1').innerText;
        //let price = document.querySelector('.price_color').innerText;

        //return {title,price};
        //return titulos;
        return infoBooks;
    })
    //await page.waitFor(1000);

    //Scrape 

    browser.close();
    return result;

    // actual scraping goes here...
    //
    // return a value
    //return 'test';
};

scrape().then((value) =>{

    console.log(value); //éxito
});
