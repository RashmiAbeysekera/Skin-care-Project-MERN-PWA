import React, { useState } from 'react';

const Reviews = () => {
  const [review, setReview] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;

    setIsPosting(true);
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await fetch('http://localhost:5000/api/brand-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewText: review,
          userName: user ? user.firstName : 'Anonymous'
        }),
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
        setReview('');
      }
    } catch (error) {
      console.error('Error posting review:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-[#3c2a21] py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight" style={{ fontFamily: '"Italiana", sans-serif' }}>
          Tried Out 7°Skin? We want your honest thoughts!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 border border-white/30 rounded-md focus:outline-none focus:border-white bg-transparent text-white placeholder-gray-300 resize-none h-24 text-sm"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isPosting}
            className="bg-white text-[#3c2a21] px-8 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-gray-100 transition uppercase disabled:opacity-50"
          >
            {isPosting ? 'POSTING...' : 'POST REVIEW'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;