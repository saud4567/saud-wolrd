const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const customerProductModel = {};

// @model-name: create
// @model-desc: create a new entry in customerProduct tbl
customerProductModel.create = async (customerId, productCode) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.customerProduct,
      sharedServices.mysqlHelperServices.parseInsertValues({
        customer_id: customerId,
        product_code: productCode,
      })
    )
    .build();

  return result;
};

// @model-name: createMany
// @model-desc: create bulk entry in customerProduct tbl
customerProductModel.createMany = async (bulkData) => {
  const result = await new sharedServices.mysqlServices()
    .insertMany(
      sharedConstants.dbTableNames.customerProduct,
      sharedServices.mysqlHelperServices.parseInsertManyValues(bulkData)
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read customerProduct based on filter
customerProductModel.read = async (whereParams) => {
  const where = [];

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `
					id,
					customer_id,
					product_code,
					created_at,
					updated_at,
            `
    )
    .from(sharedConstants.dbTableNames.customerProduct);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update customerProduct based on update and where params
customerProductModel.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.id) {
    where.push(`id='${whereParams.id}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.customerProduct,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        product_code: updateParams.productCode,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete customerProduct based on where params
customerProductModel.delete = async (whereParams) => {
  const where = [];

  if (whereParams.id) {
    where.push(`id='${whereParams.id}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.customerProduct)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = customerProductModel;
