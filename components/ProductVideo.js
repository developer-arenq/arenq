
export default function ProductVideo({ product_data }) {

    return (
        <div className="my-6 w-full max-w-2xl mx-auto relative">
            <video
                autoPlay
                muted
                playsInline
                controls
                className="w-full h-auto rounded-lg shadow-md m-auto"
                style={{ maxWidth: '35%' }}
                poster={product_data.main_image}
            >
                <source src={product_data.videos[0]} type="video/mp4" />
                Your browser does not support the video tag.
            </video>



        </div>
    );
}
