using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public bool IsPromotion { get; set; }
}


[Route("api/products")]
[ApiController]
public class ProductsController : ControllerBase
{
    private static List<Product> _products;

    public ProductsController(){
        string json = System.IO.File.ReadAllText("products.json");
        _products = JsonConvert.DeserializeObject<List<Product>>(json);
    }

    [HttpGet]
    public ActionResult<IEnumerable<Product>> Get() {
        return Ok(_products);
    }

    [HttpGet("{id}")]
    public ActionResult<Product> Get(int id) {
        var product = _products.Find(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> Post([FromBody] Product product) {
        product.Id = GenerateProductId();
        _products.Add(product);
        SaveProductsToJson();
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public ActionResult Put(int id, [FromBody] Product updatedProduct) {
        var existingProduct = _products.Find(p => p.Id == id);
        if (existingProduct == null)
        {
            return NotFound();
        }

        existingProduct.Name = updatedProduct.Name;
        existingProduct.Price = updatedProduct.Price;
        existingProduct.Description = updatedProduct.Description;
        existingProduct.IsPromotion = updatedProduct.IsPromotion;

        SaveProductsToJson();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id){
        var product = _products.Find(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        _products.Remove(product);
        SaveProductsToJson();
        return NoContent();
    }
    private void SaveProductsToJson() {
        string json = JsonConvert.SerializeObject(_products, Formatting.Indented);
        System.IO.File.WriteAllText("products.json", json);
    }

    private int GenerateProductId() {
        var maxId = _products.Max(p => p.Id);
        return maxId + 1;
    }
}
