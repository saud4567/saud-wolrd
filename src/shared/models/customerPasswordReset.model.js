const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const customerPasswordResetModel = {};

// @model-name: create
// @model-desc: create a new entry in customerPasswordReset tbl
customerPasswordResetModel.create = async (
  customer_id,
  authorization_mode,
  reset_request_id,
  reset_request_expiry
) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.customerPasswordReset,
      sharedServices.mysqlHelperServices.parseInsertValues({
        customer_id,
        authorization_mode,
        reset_request_id,
        reset_request_expiry,
      })
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read customerPasswordReset based on filter
customerPasswordResetModel.read = async (whereParams) => {
  const where = [];

  if (whereParams.customerId) {
    where.push(`customer_id=${whereParams.customerId}`);
  }

  if (whereParams.resetRequestId) {
    where.push(`reset_request_id='${whereParams.resetRequestId}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `id,
			customer_id,
			authorization_mode,
			reset_request_id,
			reset_request_expiry,
			created_at,
			updated_at`
    )
    .from(sharedConstants.dbTableNames.customerPasswordReset);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update customerPasswordReset based on update and where params
customerPasswordResetModel.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.customerPasswordReset,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        reset_request_id: updateParams.reset_request_id,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete customerPasswordReset based on where params
customerPasswordResetModel.delete = async (whereParams) => {
  const where = [];

  if (whereParams.id) {
    where.push(`id='${whereParams.id}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.customerPasswordReset)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = customerPasswordResetModel;
