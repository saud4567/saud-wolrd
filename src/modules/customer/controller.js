const customerModuleConstants = require("./constants");
const customerModuleServices = require("./services");
const customerModuleValidators = require("./validators");
const encryptionServices = require("shared/services/encryption.services");

const customerModuleControllers = {};

// controller_name: register
// controller_description:
//      controller used to register customer
customerModuleControllers.register = async (req, res, next) => {
  try {

    const encyptedResponse = await encryptionServices.encryptUsingRsaAlgorithm(JSON.stringify(req.body));
    let data = [
      "cvyWJ13/FrIbktfC2b/NkDrhnC/5nU0DSQLPU7R2ODc66n4YVBfxLgaj5xWJG+jbjzwXYcXwwsv84Z4F87czEpceMzTAEkLH34sw+m3hpfChadoA1+6GAsM7SCFsJoXtqjygszXYkU0MJpXh17amy8QgTzUTDvhsYqNfV2YOwg40RN6wKYi5PD4aVFFG3Z9LkfPc8NxUYuMc5UUjc/Qlhl+RfZLAiIhW8loWypWaGbIYajsj1yf6nyb2+rxS77/Hp8170MhSADSgIy1dmYdhchzPjTsWwHcl8+OngWC+NBPlMEsBG0C4dPkhpw2cKzjud+Vz7maFT9S+4kaq5ACG5cklIAETpgELQSD+XEFW4pSHZPbX615fla7HVEBqFfaKIb2uP5fBXU0+/fcWJY8YRwctm/XSyIzvryOlup33hiwAFVP0eXElOIqDLWMdMLJ3YFbR5aV0cpJJulPiLzVBmybEN2J3Hk88nqBVKMgc8wALnlqvaXeC5YQPvQ4aHCHVEpqB23Q68q7K0iRZG2AH7ud9cMsjFo6gMk1q6VpXZcAhLRI4u1XBBrS7bFW1vYZbjF81Bl/fCzLgWbKJHf7oc5Pti3T1Mz6YyFGt5VBFdPnl72JmJS+fiiBdPmfPwWz/NcQY4NxXIwnmgR1RJuLBC4u2v/MfmEpxXVHSBL4J2QI=",
      "c4fjta0DMTR7ytqRaCyfp0ZEYXmzTGPjP56OWh8FSc/eG6vm6DdN/rREnVPbiQEFFRc1yMMqCQVN3pUYN79v2jo/GU0Np2NchfZwvPdK70rZT0rXfe2/fjB82kIMRUalfYMlfFxIVNw/Dr4YCMviw6pNHISSuVNQYlyUe3GgK9xJPAQrtrqlkYEGP1ZLQ5sUES/cJ/N/GaCGDXFGgwdRRNuQ6H+rk2v6wxRumalzN7Ry1l8iisx89GAx5Xrg6VQF9cIA5k87PDuzLjEkVKYHGoH3QeWufnkuaFP7P13v81Epg7OKb0CGd4YqICcjpeWFT0Zv/5QN5fX6jtjiJQyt7HeMO1Ho98Fz1E93TT1yL6+dFn4SQwJ5hmrScMz3d+Z1rDc+B3GhlBZJzrDWyiein4E8aB0TGEJ/oARDcAjNBMqop8b7RprATb5vrzowt8GJ7bqwQl1jPq1U9+7O3/XR2PUDwzrV+CKFJMfO2buCfWZd4IgK3qoPyhDIOjzp8SlPgqCDw0R5UETGbpd62FlIAYnGQ+liCUBEKZMAnAr2S6vZ/g/q7CI44QDbqxteOmzk/xWgam8YnftX3fLL8j+gFv/S+BJgd8nY6NqlEKWWk9A4pZ6YUjYXN9s6HlqRpGGZarVR0cBKua6XSbsUoX8kWVINZbc8b95Fq0rz52UH0/0=",
      "ZrxH9PYyFRWndgdD0fH2PbibFW8+3HS7V5PGOJhIBfLU8x0yyK89DRumH5U0R/O7/j9dI56x36JyWaYh79c1gSnGdq4Ck6GX7POjy4rKDUKWXN1uHM4jaakNJ/O0zdBvSwkg9QbUbq/gi8EFJKTD/aJqIDemzkq9cog7JvNvj2FMB9Byzz/FnqcsIANZ7EGZgV988KIdUfci27BfoII2OagScaOI3WeeCBeXlH2sVCYzStP0u/sHL2WGj6HM9Uz9iZjXi6WWLON7JNeKUeychjbCS+sRkobu5T6EVoXxxDLsoYEtqRoc1qmvr2Uu8qxn0e0JT6zPJZZz2oxIR/sM8f4lhTn66dd6jO2t9sLzlZMmgGQ72XOFJM29WIyiDTKvbdVxcJyA058fHEfJHIGGvM7gGSjDdSEQjO0ENbvV7DzTzsSiRD8UsPIFv5j72cZ4ZRfYDbhEhznwLP+TC0uTWnNC0RFtVzHIU0PQdMDGbTYKwt6FVAb6XTv4DTe56L9V5Ot1I2gVusG9HiJoMECOPjsNX+EjxCNz6OXKfEotj6k/w5cUrFWn2pktwU1idRJZqYnzCGidZLSFvns9nupIwrmcP54etBkfT8OsDBBvL/mTfPe1EO13yo3kz26PDo3esn9En+aBHy16nsPm6oCzADbBGtKL6Pb5rf7NrkudYxw=",
      "Z1jKIbfmkmsOr7AzAd7K0qiMZLauhXVsCxOt464tjMZEjsoJLc9VcfgIVrWlWkE98eK6qMgTeNHCZ7eyIdKaFuYKsGwkQnXBdR216lS4S8YCjB6J+TpW1RPs1acQt4QWM4X+h0zqJhY1PDsDGpK7hqU7BZV+AioJz8+/Do/BThC7PqxwUzHsEu7Wc9kUAwXG03dY+rTrhewtukuQm78V+SOyuNK8zn/SW6U1o4Dc9BCXSoFi2qsurcpXWf18tVqXFWcWSZqDMFtl+SN8/ZE/KNGDjxZ8ohp31JySqxdmhEClO9gvsu7jfdgKMOYdoBHMnBTNjd7HOHZQIIZfKKxja744chEYIIyKzFCflpkNQ22hWZT++vpBc+sWCQ5ovUHl/MPnZ5+TFaBZCL7b0PIgBw07/weadBYuMnvALiMCq7yf2x0SuTZWHx5vFTDCrnT3U8I8jPP4VyCuz28CX5QzCcqZS0+kgFJxCscSK6ByWxoI7bM7FN6ez7DzDyiK2ilJo5I/V7wqgJbGTWO+uBVq8Jj/MJK8VW1RnjGzcgIdb10rf7I1QgSnOKyE9UISMLEGXmdDVgUGesBmoXTXcPNi7kH0CRFEl6VdwTzLxKR1Z5JBtSK4uJ1vkqAWoPurFv4cXraaYjl2R/QtpJFziv4zWtEqMS325u5IXmvrEJ46IiA=",
      "sKA4EWG7OGPFKchtwI2yPkWx1Jbw5uR0Dq5cF5SSrdi0Nggsh8mg1wpX2V8W2KX0ymz4QjPCm4WeWgK58HbcI6oDl9bmlUTlcCFpwvKrM0gcmkkAPqFbDY1vh+BI00Vd3IGXXBpK/x+q7HptBSppdo7WBXsvohnkoT7plTrpJUbEJQ1X9f2b4OnHN2do4dBABHiHd2y90XPdiMWXTzZNARNjGF8g84BeZ96jvkPztIfUcPkVyJ6OUAeAkJRB53rCGQ8mYRRu78tvxbiNQFZ0Z7MF5ZEfnEb6a1uFp+xMzyvMxh7iYSxg10ljSxvxrS1mrnNsb+5nDp08OPouTDW+QxCJKYL0PMJ3S/cv5M7n6Xh50g6skoMqp06ykGJvQ50MvB/+R/wyOSZQBMx3BWj8rfR0dUTL63rXdLbW1eGdmX0mLajF+D7+D8pSXEgcClz/3FHXw3DtHXSBrZEUBHUZ4ju+3vJIVuGZ06k+vU3drFo0134frEvvZPicY5IpovWm1v539LOzHe9xxL8/xvZviHzNgj1On8gImNLIuNQXefJWK9322iZf54xLDcK9hoV1m2UNtUW/sClnFGn6zo9HGYs4WCBY7PQ+zTFsM6/j8WRzxdjFdgIin//r3z+J2c8ukPTmxZYAHnRfpZER2lOaBKg95tQqKJVDv+VGWIAjauc=",
      "I60k+cDOjB6kSrb/Z2fQh1hhizic+iYurVMa+MkWo95eFAW0OwPvkLcKyoZWQFB4zPQjg1/Nm8AuuA4Uq1D8EW/JGtgnD14qeBk6y+uLbw+LFC8vtP7R8cF2JJZHb0Z4+bcRzLTQ456s23GfZNL4LcbyXxLx+vH24duFkFK4GEye86OEcVNH6wrDjxZkncrR1dbibXxnui9C6mZ3VA0+caHz5mMRNSP7olQBhXMBiIM4Wow8wwdAMMETQX+d5cbfaGX92nYGyodR17oIZMaSKpjWOv3KU/wj5THQ86GZeY9bzRE7D1tbLLpb+uPf8HuKEo1OFoEcHIqjaUTtnd48CTil6N6n7Owz7B3KBVnJbiAeVtsi9BeZ03pHLogs74MrOASieDXiiUSPD1HykPIYjPs3mjs62B/pEDvI0rkK1BQmNIODaIBfge1pW3sFCCRXjP73jbBvm65K5+7ZpvOg+EwMpwfqEV/cbBFIncH2klI2ZtfK1IEF9v9gpr8YU0ZNNofg3le4NNLFR7rOaoYYCRoWGj/Kmt5fsrB4h0q5b5FDJf5TdR25IJjU38nnfkqAlRdlaB2DsvZalaiF9jjxCr+Z9GdhFQQ9b4tNEtiRqbPckN06SxQ3F4QaoAmI38oZqZcLQGan27H/FKdjRD3PaQ8UOmIetrnwLYUgR9Gtl8M=",
      "CK57KFI+Vtv7AE/IAMFo7aDPzGU8sg0oZdP8eArkhsteK9VvKBYj7ueS5KOdTfU0kguF5oEPw73vwDjf7KbQevaAhDW8Gp/0H+CnFzwZO6e4GOkyrgEyMNxlstQg4zmCr/9BCE6qdOyLYNkJg21yNXYfkqPFKu0U2vXYRteJHQZ6bdGWoxejwSmoJgTU6p+LIn88T2ABdsStygLezMA4ARjMT0NWpIoOoVfKe+06C685+JqfLTscHjREykTWy6LrlPSQUb1FtRwh2gHrlnaroTpqk5tVVpp2pGb+CHXuCGO5F17AprQGs5+03CRT2kz4CtcTfFh7CQE2VaJB668Pxy7SCjZ4d4NaVOtvT36IuKL+jdO4X3Imm8aQjfvHMXJu/IAr1ot89ioUeFua4FdJBVn+Z38dzQLCD27oc77sqaJ4y3vo+kbx0OCecDKT/QSvwzzE+6loCNqC3lbtg5SYNdGH/nINd7MCyeKTL4Ru7aocwOWqYYRJdpTExHZDWXYfJBYGdbms9H8+T5awzG9p923qgPpGiM1BbSh2nxfqkgvUlZOpf8h2MroKKuV+Ivp28OWYFEkjP4rHeFuYl+eR7+O9SMkS/jnxMJtdlkH7KEu9FKer3CSzX/2V11cCGS2QhK1a9sBkYCPZcHW0igXTIORUEzSYAhN49yX1mI9JISs=",
      "Jp7T3fpZ9SKxQlCB8YymZXxmRoTk5ei7XME4MWOTe63IlEKTD3JdthIYcqyXOcTOC8GJgwBq1ABDzXwq8g+z/twkhPyqR2Jw6dpfdyCW9+7+9PwXriAdKTqDGs5v5zZfIiYh+VNMeKhcsq6blQIWFKOegDbWhxyGr4fYwASxsLZN9X8WMvQkDYdPJnxTNwbc1VTDUXvOycySFYLs612X6DAdhdxPxbld7k0+Rh20md922RWtXdRwdLiIYdwu1brb3xLZ8v5z3/Hg1ey5bGr2345uzdj2X2qOzto+bjYZE86zFsBWwlAxu9j5qiWeryq5S09ZwSCWoG/CNQ1NQnlWr0uRlipP8fmFzj8RrG0/pfW8kYYIRP98K29eo6OONz0isLbhYuOkdTe2tgVFbO6kdJ2CPHiRLWMBeXWjK9SsJ8lOHa1UYaPC/F5GCn9lUV3RLlNZ5ZlHWmUNmoBStLXzCkxAfg9WLN9oQqZKVvsMqahuTsAywAysRdiMYK4Ti/5un4tkSg5A1hEqBb4CMIbR9ra+mp7dvSKHaRViZLScbq2FxRl4e38qo46A1Opi7oKDlFxQqVS4GOmTDdQo1cu0/GNeYQcbsimNrL+uc1VBJlWDXi6uNqb0jT149lBgdgtno0PDZXVk5Ek0InmNwXMbKo++wm8CXJtojjiyVSwQ0JQ=",
    ];
    const encyptedPayload = await encryptionServices.decryptUsingRsaAlgorithm(encyptedResponse);
    /** Validation of request data */
    // const validateBody = customerModuleValidators.registration(encyptedPayload);

    /** handle logic within service function */
    const customerDetails = await customerModuleServices.registration(
      encyptedPayload
    );

    /**return response */
    next({
      ...customerModuleConstants.registration.messages.CRS001,
      result: customerDetails,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: authenticate
// controller_description:
//      controller used to authenticate customer and generate token
customerModuleControllers.authenticate = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.authentication(req.body);

    /** handle logic within service function */
    const customerDetails = await customerModuleServices.authentication({
      username: validateBody.username,
      authorizationType: validateBody.authorization_type,
      authorizationKey: validateBody.authorization_key,
    });

    /**return response */
    next({
      ...customerModuleConstants.authentication.messages.CAS001,
      result: customerDetails,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: validate
// controller_description:
//      controller used to validate token
customerModuleControllers.validate = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.tokenValidate(req.headers);

    /** handle logic within service function */
    const validateToken = await customerModuleServices.validate({
      token: validateBody.authorization,
    });

    /**return response */
    return next({
      ...customerModuleConstants.validate.messages.CVS001,
      result: validateToken,
    });
  } catch (error) {
    if (
      error.name == customerModuleConstants.validate.JsonWebTokenError ||
      error.name == customerModuleConstants.validate.tokenExpiredError
    ) {
      next({
        ...customerModuleConstants.validate.errorMessages.CVE002,
        result: { isValid: false },
      });
    } else {
      next(JSON.parse(error.message));
    }
  }
};

// controller_name: customerDetails
// controller_description:
//      controller used to get customer details
customerModuleControllers.customerDetails = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.customerDetails(req);

    /** handle logic within service function */
    const customerDetails = await customerModuleServices.customerDetails({
      customerRefId: validateBody.customerId,
      requestedData: validateBody.requestedData,
    });

    /**return response */
    next({
      ...customerModuleConstants.customerDetails.messages.CCDS001,
      result: customerDetails,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: changeCredentials
// controller_description:
//      controller used to change the credentials of customer
customerModuleControllers.changeCredentials = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.changeCredentials(req.body);
    /** handle logic within service function */
    const changeCredentials = await customerModuleServices.changeCredentials({
      resetMode: validateBody.reset_mode,
      changedCredentials: validateBody.changed_credentials,
      customerRefId: req.customerRefId,
    });

    /**return response */
    return next({
      ...customerModuleConstants.changeCredentials.messages.CCCS001,
      result: "",
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: initiateResetCredentials
// controller_description:
//      controller used to initiate the process for resetting the credentials of customer
customerModuleControllers.initiateResetCredentials = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.initiateResetCredentials(
      req.body
    );
    /** handle logic within service function */
    const initiateReset = await customerModuleServices.initiateResetCredentials(
      {
        username: validateBody.username,
        twoFa: validateBody.two_fa,
        resetMode: validateBody.reset_mode,
      }
    );

    /**return response */
    return next({
      ...customerModuleConstants.initiateResetCredentials.messages.CIRCS001,
      result: initiateReset,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: confirmResetCredentials
// controller_description:
//      controller used to reset credentials of customer
customerModuleControllers.confirmResetCredentials = async (req, res, next) => {
  try {
    /** Validation of request data */
    const validateBody = customerModuleValidators.confirmResetCredentials(
      req.body
    );
    /** handle logic within service function */
    const confirmReset = await customerModuleServices.confirmResetCredentials({
      resetRequestId: validateBody.reset_request_id,
      resetCredentials: validateBody.reset_credentials,
    });

    /**return response */
    return next({
      ...customerModuleConstants.confirmResetCredentials.messages.CCRCS001,
      result: "",
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

module.exports = customerModuleControllers;
