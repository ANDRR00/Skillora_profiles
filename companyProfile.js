const companyGetAPI = "https://skillora-api-code.case-scheduler-worker.workers.dev/api/company/5";

const nameBox = document.querySelector(".name");
const locationBox = document.querySelector(".location span");
const aboutMe = document.querySelector(".aboutMe");
const websiteLink = document.querySelector(".website a");
const phoneBox = document.querySelector(".phone span:last-child");
const logoImage = document.querySelector(".profilePicture img");

async function getCompanyProfile() {
    try {
        const response = await fetch(companyGetAPI, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();

        console.log("Company Profile:", data);

        if (data.success && data.user) {
            const company = data.user;

            nameBox.textContent = company.company_name;
            locationBox.textContent = company.company_origin;
            aboutMe.textContent = company.company_description;

            websiteLink.textContent = company.company_website;
            websiteLink.href = company.company_website;

            phoneBox.textContent = company.company_phone;

            if (company.logo_url) {
                logoImage.src = company.logo_url;
            } else {
                logoImage.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
            }
        }

        console.log(logoImage);

        return data;

    } catch (error) {
        console.error("Error fetching company profile:", error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getCompanyProfile();
});