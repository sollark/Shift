/**
 * Async handler to wrap the API routes, allowing for async error handling.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
export default asyncHandler;
