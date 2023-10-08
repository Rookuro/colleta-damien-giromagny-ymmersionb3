using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
public enum tag {
    processor,
    motherboard,
}

public enum InteractionType
{
    Viewed,
    AddedToCart,
    Purchased
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public string DescriptionV2 { get; set; }
    public bool IsPromotion { get; set; }
    public List<string> UrlImage { get; set; }
    public string UrlProduct { get; set; }
    public tag TagProduct { get; set; }
    public int Quantity { get; set; }
}
public class UserProductInteraction
{
    public string UserId { get; set; }
    public int ProductId { get; set; }
    public InteractionType InteractionType { get; set; }
    public DateTime InteractionTime { get; set; }
}



[Route("api/products")]
[ApiController]
public class ProductsController : ControllerBase
{
    private static List<Product> _products;
    private static List<UserProductInteraction> interactions = new List<UserProductInteraction>();

    public ProductsController(){
        string json = System.IO.File.ReadAllText("products.json");
        _products = JsonConvert.DeserializeObject<List<Product>>(json);
    }

    [HttpGet]
    public ActionResult<IEnumerable<Product>> Get() {
        return Ok(_products);
    }


    [HttpGet("{id}")]
    public ActionResult<Product> Get(int id)
    {
        var product = _products.Find(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> Post([FromBody] Product product)
    {
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
        existingProduct.DescriptionV2 = updatedProduct.DescriptionV2;
        existingProduct.IsPromotion = updatedProduct.IsPromotion;
        existingProduct.UrlImage = updatedProduct.UrlImage;
        existingProduct.UrlProduct = updatedProduct.UrlProduct;
        existingProduct.TagProduct = updatedProduct.TagProduct;
        existingProduct.Quantity = updatedProduct.Quantity;

        SaveProductsToJson();
        return NoContent();
    }

    [HttpPost("interactions")]
    public ActionResult RecordInteraction([FromBody] UserProductInteraction interaction){
        interactions.Add(interaction);
        return Ok();
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
