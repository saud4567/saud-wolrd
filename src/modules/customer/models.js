const sharedConstants = require("shared/constants");
const sharedServices = require("shared/services");

const models = {};

// @model-name: getCustomerDetails
// @model-desc: model function used to get customer details
models.getCustomerDetails = async (whereParams) => {
    const where = [];
    const joinCondition = [];

		if (whereParams.username) {
			where.push(`(mobile='${whereParams.username}' or email='${whereParams.username}')`);
	  }

		joinCondition.push(`ca.customer_id = c.id`);

    const result = await new sharedServices.mysqlServices()
        .select(
            `c.id as customerId,
						c.email,
						c.mobile,
						ca.password,
						ca.mpin,
						ca.biometric `
        )
        .from(`${sharedConstants.dbTableNames.customer} c`)
				.join(`${sharedConstants.dbTableNames.customerAuthentication} ca`, joinCondition)
        .where(where.join(" AND "))
        .build();

    return result[0];
};

module.exports = models;
