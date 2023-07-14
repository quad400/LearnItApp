export const parseResponseCourse = (data) => {
  const val = [];
  for (var i = 0; i < data.length; i++) {
    val.push(
      data[i].title,
      data[i].user,
      data[i].category,
      data[i].price,
      data[i].thumbnail,
      data[i].previous_price
    );
  }
  console.log(val.previous_price);
  return val;
};

export const parseResponseCategory = (data) => {
  const val = [];
  for (var i = 0; i < data.length; i++) {
    val.push(data[i].name);
  }
  return val;
};


export function parseResponse(data) {
  let value = [];
  for (var i = 0; i < data.length; i++) {
    let val = {};
    val["name"] = data[i].name;
    val["category_id"] = data[i].category_id;
    value.push(val);
  }
  return value;
}

export const numberToPrice = (price) => {
  let val = new Intl.NumberFormat("en-Us", {
    style: 'currency',
    currency: 'USD'
  })

  const result = val.format(price)

  return result;
}