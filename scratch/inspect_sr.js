const { SatuSehatService } = require("./frontend/lib/services/satusehat");
const fs = require("fs");

async function inspectResource() {
    try {
        const config = await SatuSehatService.getConfig();
        if (!config) throw new Error("Config not found");

        const token = await SatuSehatService.getAccessToken(config);
        const srId = "2374eca8-c933-4041-8e2d-4d82fec62b28";
        const baseUrl = SatuSehatService.getBaseUrl(config.environment, config.baseUrl);
        const url = `${baseUrl}/ServiceRequest/${srId}`;

        console.log(`Fetching ServiceRequest: ${url}`);
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Organization-Id": config.organizationId
            }
        });

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

inspectResource();
