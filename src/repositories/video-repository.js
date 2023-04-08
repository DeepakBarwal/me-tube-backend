import Video from "../models/video.js";
import CrudRepository from "./crud-repository.js";

class VideoRepository extends CrudRepository {
  constructor() {
    super(Video);
  }
}

export default VideoRepository;
