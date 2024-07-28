import { Button } from "react-bootstrap"

export const ProgressButtons=({onPrevious,onNext})=>{
    return <div className='d-flex justify-content-end mt-5'>
    <Button variant="secondary" className='me-4' onClick={onPrevious}>Previous</Button>
    <Button variant="primary" onClick={onNext}>Next</Button>
    </div>
}