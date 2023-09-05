const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const encryptionServices = require("shared/services/encryption.services");

const customerBankModel = {};

// @model-name: create
// @model-desc: create a new entry in customerBank tbl
customerBankModel.create = async (
  customerId,
  bankName,
  accountName,
  accountNumber,
  ifscCode,
  upiHandle,
  micrCode,
  isDefault
) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.customerBank,
      sharedServices.mysqlHelperServices.parseInsertValues({
        customer_id: customerId,
        bank_name: bankName,
        account_name: accountName,
        account_number: accountNumber,
        ifsc_code: ifscCode,
        upi_handle: upiHandle,
        micr_code: micrCode,
        is_default: isDefault,
      })
    )
    .build();

  return result;
};

// @model-name: createMany
// @model-desc: create bulk entry in customerBank tbl
customerBankModel.createMany = async (bulkData) => {
  const result = await new sharedServices.mysqlServices()
    .insertMany(
      sharedConstants.dbTableNames.customerBank,
      sharedServices.mysqlHelperServices.parseInsertManyValues(bulkData)
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read customerBank based on filter
customerBankModel.read = async (whereParams) => {
  const where = [];
  /** encyption of  where params */
  whereParams = encryptionServices.encryptData(whereParams);

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  if (whereParams.isDefault) {
    where.push(`is_default='${whereParams.isDefault}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `id,
            customer_id,
            bank_name,
            account_name,
            account_number,
            ifsc_code,
            upi_handle,
            micr_code,
            is_default,
            created_at,
            updated_at
            `
    )
    .from(sharedConstants.dbTableNames.customerBank);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update customerBank based on update and where params
customerBankModel.update = async (updateParams, whereParams) => {
  const where = [];
  /** encyption of  where params */
  whereParams = encryptionServices.encryptData(whereParams);

  if (whereParams.id) {
    where.push(`id='${whereParams.id}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.customerBank,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        bank_name: updateParams.bankName,
        account_name: updateParams.accountName,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete customerBank based on where params
customerBankModel.delete = async (whereParams) => {
  const where = [];

  if (whereParams.id) {
    where.push(`id='${whereParams.id}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.customerBank)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = customerBankModel;
