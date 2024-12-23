document.addEventListener('DOMContentLoaded', () => {
    const testimonialsData = [
        {
            text: "“Amazing”",
            name: "Rey",
            rating: 4,
        },
        {
            text: "“Amazing experience!”",
            name: "John",
            rating: 5,
        },
        {
            text: "“Very helpful and caring staff.”",
            name: "Sarah",
            rating: 4,
        },
        {
            text: "“Great service, will come back.”",
            name: "Mike",
            rating: 3,
        },
        {
            text: "“Top-notch health care.”",
            name: "Elena",
            rating: 5,
        },
        {
            text: "“The best doctor I’ve ever had.”",
            name: "Daniel",
            rating: 5,
        },
        {
            text: "“Professional and friendly staff.”",
            name: "Liam",
            rating: 4,
        },
    ];
  
    const carousel = document.querySelector('.reviews-carousel');
    const testimonialForm = document.getElementById('testimonial-form');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const itemsPerPage = 3; // Jumlah testimonial per halaman
    let currentPage = 1;
  
    // Fungsi untuk membuat elemen testimonial dengan bintang rating
    const createTestimonialItem = (testimonial) => {
        const figure = document.createElement('figure');
        figure.classList.add('reviews-thumb', 'd-flex', 'flex-wrap', 'align-items-center', 'rounded');
  
        const stars = document.createElement('div');
        stars.classList.add('reviews-stars');
        stars.innerHTML = getStars(testimonial.rating);
  
        const textElement = document.createElement('p');
        textElement.classList.add('reviews-text', 'w-100');
        textElement.textContent = testimonial.text;
  
        const imgElement = document.createElement('img');
        imgElement.classList.add('img-fluid', 'reviews-image');
        imgElement.setAttribute('src', 'images/reviews/beautiful-woman-face-portrait-brown-background.jpeg');
        imgElement.setAttribute('alt', '');
  
        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('ms-4');
        figcaption.innerHTML = `<strong>${testimonial.name}</strong><span class="text-muted">Patient</span>`;
  
        figure.appendChild(stars);
        figure.appendChild(textElement);
        figure.appendChild(imgElement);
        figure.appendChild(figcaption);
  
        return figure;
    };
  
    // Fungsi untuk membuat bintang berdasarkan rating
    const getStars = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="bi-star-fill"></i>';
            } else {
                stars += '<i class="bi-star"></i>';
            }
        }
        return stars;
    };
  
    // Fungsi untuk memuat testimonial ke dalam carousel
    const loadTestimonials = (page) => {
        carousel.innerHTML = '';  // Menghapus semua testimonial sebelumnya
  
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, testimonialsData.length);
        const currentTestimonials = testimonialsData.slice(startIndex, endIndex);
  
        currentTestimonials.forEach((testimonial) => {
            const testimonialItem = createTestimonialItem(testimonial);
            carousel.appendChild(testimonialItem);
        });
  
        // Mengaktifkan atau menonaktifkan tombol navigasi
        prevButton.disabled = page === 1;
        nextButton.disabled = page * itemsPerPage >= testimonialsData.length;
    };
  
    // Memuat testimonial pertama kali
    loadTestimonials(currentPage);
  
    // Event listener untuk tombol Next
    nextButton.addEventListener('click', () => {
        if (currentPage * itemsPerPage < testimonialsData.length) {
            currentPage++;
            loadTestimonials(currentPage);
        }
    });
  
    // Event listener untuk tombol Previous
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadTestimonials(currentPage);
        }
    });
  
    // Event listener untuk form testimonial
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const name = document.getElementById('names').value.trim();
        const message = document.getElementById('messages').value.trim();
        const rating = document.getElementById('rating').value;
  
        if (!name || !message || !rating) {
            showToast('All fields are required!', 'danger');
            return;
        }
  
        const newTestimonial = {
            text: `"${message}"`,
            name: name,
            rating: parseInt(rating),
        };
  
        testimonialsData.push(newTestimonial);
        loadTestimonials(currentPage); // Refresh testimonial yang ditampilkan
        testimonialForm.reset();
        showToast('Thank you for your testimonial!', 'success');
    });
  
    // Fungsi untuk menampilkan toast notification
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
  
        if (type === 'success') {
            toast.style.backgroundColor = '#28a745';
        } else if (type === 'danger') {
            toast.style.backgroundColor = '#dc3545';
        }
  
        document.body.appendChild(toast);
  
        setTimeout(() => {
            toast.style.opacity = 1;
        }, 100);
  
        setTimeout(() => {
            toast.style.opacity = 0;
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }
  });
  