const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const customerDpModel = {};

// @model-name: create
// @model-desc: create a new entry in customerDp tbl
customerDpModel.create = async (
	customerId,
	dpId,
	beneficiaryId,
	secondHolderName,
	isDefault,
) => {
    const result = await new sharedServices.mysqlServices()
        .insert(
            sharedConstants.dbTableNames.customerDp,
            sharedServices.mysqlHelperServices.parseInsertValues({		
							customer_id:customerId,
							dp_id:dpId,
							beneficiary_id:beneficiaryId,
							second_holder_name:secondHolderName,
							is_default:isDefault,
						})
        )
        .build();

    return result;
};

// @model-name: createMany
// @model-desc: create bulk entry in customerDp tbl
customerDpModel.createMany = async (
	bulkData
) => {
    const result = await new sharedServices.mysqlServices()
        .insertMany(
            sharedConstants.dbTableNames.customerDp,
            sharedServices.mysqlHelperServices.parseInsertManyValues(bulkData)
        )
        .build();

    return result;
};

// @model-name: read
// @model-desc: read customerDp based on filter
customerDpModel.read = async (whereParams) => {
    const where = [];

    if (whereParams.customerId) {
        where.push(`customer_id='${whereParams.customerId}'`);
    }

    let result = new sharedServices.mysqlServices()
        .select(
					`
					id,
					customer_id,
					dp_id,
					beneficiary_id,
					second_holder_name,
					is_default,
					created_at,
					updated_at,
            `
        )
        .from(sharedConstants.dbTableNames.customerDp);

    if (where.length) {
        result = result.where(where.join(" AND "));
    }

    result = await result.build();

    return result;
};

// @model-name: update
// @model-desc: update customerDp based on update and where params
customerDpModel.update = async (updateParams, whereParams) => {
    const where = [];

    if (whereParams.id) {
        where.push(
            `id='${whereParams.id}'`
        );
    }
   

    const result = await new sharedServices.mysqlServices()
        .update(
            sharedConstants.dbTableNames.customerDp,
            sharedServices.mysqlHelperServices.parseUpdateValues({
							beneficiary_id: updateParams.beneficiaryId,
							dp_id: updateParams.dpId,
               
            })
        )
        .where(where.join(" AND "))
        .build();

    return result;
};

// @model-name: delete
// @model-desc: delete customerDp based on where params
customerDpModel.delete = async (whereParams) => {
    const where = [];

    if (whereParams.id) {
        where.push(
            `id='${whereParams.id}'`
        );
    }

    const result = await new sharedServices.mysqlServices()
        .delete(sharedConstants.dbTableNames.customerDp)
        .where(where.join(" AND "))
        .build();

    return result;
};

module.exports = customerDpModel;
