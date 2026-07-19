const freelancerGetAPI = "https://skillora-api-code.case-scheduler-worker.workers.dev/api/freelancer/16";


const nameBox = document.querySelector(".name")
const locationBox = document.querySelector(".locationSpan")
const ageBox = document.querySelector(".ageBox")
const aboutMe = document.querySelector(".aboutMe")
const portfolioWebsite = document.querySelector(".website")
const profilePicture = document.querySelector("#profilePic")

// Function to calculate age from birth_date (YYYY-MM-DD format)
function calculateAge(birthDateString) {
    if (!birthDateString) return null;

    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}


async function getFreelancerProfile() {
    try {
        const response = await fetch(freelancerGetAPI, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();

        console.log("Freelancer Profile:", data);

        if (data.success && data.user) {
            const user = data.user;

            nameBox.textContent = `${user.first_name} ${user.last_name}`
            locationBox.textContent = `${user.city}, ${user.street}, postal code: ${user.postal_code}`

            const userAge = calculateAge(user.birth_date)
            ageBox.textContent = userAge

            aboutMe.textContent = user.about_me
            portfolioWebsite.textContent = user.portfolio
            portfolioWebsite.href = user.portfolio

            if (user.profile_pic_url) {
                profilePicture.src = user.profile_pic_url;
            } else {
                profilePicture.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; // fallback to default
            }

            


        }

        console.log(profilePicture)

        return data;

    } catch (error) {
        console.error("❌ Error fetching freelancer profile:", error);
        showAlert("Error", "Failed to load profile. Please try again.", "error");
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getFreelancerProfile();
});