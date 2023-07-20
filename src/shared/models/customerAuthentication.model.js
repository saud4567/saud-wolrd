const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const customerAuthenticationModel = {};

// @model-name: create
// @model-desc: create a new entry in customerAuthentication tbl
customerAuthenticationModel.create = async (
	customerId,
	password,
	mpin,
	biometric,
	pwdLastSetDate,
	mpinLastSetDate,
	
) => {
    const result = await new sharedServices.mysqlServices()
        .insert(
            sharedConstants.dbTableNames.customerAuthentication,
            sharedServices.mysqlHelperServices.parseInsertValues({
						customer_id:customerId,
						password,
						mpin,
						biometric,
						pwd_last_set_date:pwdLastSetDate,
						mpin_last_set_date:mpinLastSetDate,
						})
        )
        .build();

    return result;
};

// @model-name: read
// @model-desc: read customerAuthentication based on filter
customerAuthenticationModel.read = async (whereParams) => {
    const where = [];

    if (whereParams.customerId) {
        where.push(`id='${whereParams.customerId}'`);
    }

    let result = new sharedServices.mysqlServices()
        .select(
            `
						id,
						customer_id,
						password,
						mpin,
						biometric,
						pwd_last_set_date,
						mpin_last_set_date,
						failed_login_attempt,
						last_failed_login_date,
						is_login_blocked,
						created_at,
						updated_at,
            `
        )
        .from(sharedConstants.dbTableNames.customerAuthentication);

    if (where.length) {
        result = result.where(where.join(" AND "));
    }

    result = await result.build();

    return result;
};

// @model-name: update
// @model-desc: update customerAuthentication based on update and where params
customerAuthenticationModel.update = async (updateParams, whereParams) => {
    const where = [];

    if (whereParams.id) {
        where.push(
            `id='${whereParams.id}'`
        );
    }
   

    const result = await new sharedServices.mysqlServices()
        .update(
            sharedConstants.dbTableNames.customerAuthentication,
            sharedServices.mysqlHelperServices.parseUpdateValues({
							password: updateParams.password,
                mpin: updateParams.mpin,
            })
        )
        .where(where.join(" AND "))
        .build();

    return result;
};

// @model-name: delete
// @model-desc: delete customerAuthentication based on where params
customerAuthenticationModel.delete = async (whereParams) => {
    const where = [];

    if (whereParams.id) {
        where.push(
            `id='${whereParams.id}'`
        );
    }

    const result = await new sharedServices.mysqlServices()
        .delete(sharedConstants.dbTableNames.customerAuthentication)
        .where(where.join(" AND "))
        .build();

    return result;
};

module.exports = customerAuthenticationModel;
