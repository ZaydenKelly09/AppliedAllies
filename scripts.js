    // Sample blog posts data
    const blogPosts = [
        {
            id: 1,
            title: "My Main Tenets",
            date: "April 22, 2025",
            excerpt: "Learn the principles of effective dark mode design and how to implement it in your projects.",
            content: `
                <p>
                Hiiii!
                </p>
                
            `
        },
    ];

    // Function to create post preview cards
    function createPostCards() {
        const postsContainer = document.getElementById('posts-container');
        const template = document.querySelector('.post-template .card');
        
        postsContainer.innerHTML = '';
        
        blogPosts.forEach(post => {
            const card = template.cloneNode(true);
            
            card.querySelector('.post-title').textContent = post.title;
            card.querySelector('.post-date').textContent = post.date;
            card.querySelector('.post-excerpt').textContent = post.excerpt;
            
            const readMoreLink = card.querySelector('.read-more');
            readMoreLink.addEventListener('click', (e) => {
                e.preventDefault();
                showPost(post.id);
            });
            
            postsContainer.appendChild(card);
        });
    }

    // Function to show a specific post
    function showPost(postId) {
        const post = blogPosts.find(p => p.id === postId);
        if (!post) return;
        
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-date').textContent = post.date;
        document.getElementById('post-body').innerHTML = post.content;
        
        document.getElementById('blog-content').style.display = 'none';
        document.getElementById('post-content').style.display = 'block';
        
        window.scrollTo(0, 0);
    }

    // Function to show the home page
    function showHomePage() {
        document.getElementById('blog-content').style.display = 'block';
        document.getElementById('post-content').style.display = 'none';
    }

    // Initialize the blog
    document.addEventListener('DOMContentLoaded', () => {
        createPostCards();
        setupRetroThemeDetection();
    });

    // HTML template for adding a new blog post
    function getNewPostTemplate(id, title, date, excerpt, content) {
        return `
        // Add this to the blogPosts array:
        {
            id: ${id},
            title: "${title}",
            date: "${date}",
            excerpt: "${excerpt}",
            content: \`
                ${content}
            \`
        },
        `;
    }

    // Example of how to add a new post
    console.log("To add a new post, copy this template and add it to the blogPosts array:");
    console.log(getNewPostTemplate(
        4, 
        "Your New Post Title", 
        "Month Day, Year", 
        "A brief excerpt of your post that appears on the homepage.",
        "<p>Your post content goes here. You can use HTML tags for formatting.</p>"
    ));

    // Retro Theme Detection and Toggle
    function setupRetroThemeDetection() {
        let retroBuffer = "";
        const retroKeyword = "retro";
        const scanlineElement = document.getElementById('retro-scanline');
        const indicatorElement = document.getElementById('retro-indicator');
        
        document.addEventListener('keydown', function(event) {
            // Only track alphanumeric keys
            if (/^[a-z0-9]$/i.test(event.key)) {
                retroBuffer += event.key.toLowerCase();
                
                // Keep buffer at reasonable length
                if (retroBuffer.length > 10) {
                    retroBuffer = retroBuffer.substring(1);
                }
                
                // Check if buffer contains the keyword
                if (retroBuffer.includes(retroKeyword)) {
                    toggleRetroTheme();
                    retroBuffer = ""; // Reset buffer after activation
                }
            }
        });

        function toggleRetroTheme() {
            const body = document.body;
            
            if (body.classList.contains('retro-theme')) {
                // Turn off retro theme
                body.classList.remove('retro-theme');
                scanlineElement.style.display = 'none';
                indicatorElement.style.display = 'none';
            } else {
                // Turn on retro theme
                body.classList.add('retro-theme');
                scanlineElement.style.display = 'block';
                indicatorElement.style.display = 'block';
            }
        }
    }
