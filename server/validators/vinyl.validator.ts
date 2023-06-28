import Joi from 'joi';
// import { JacketType, EAdditional, VinylGramWeight, LabelType, VinylSide } from "../enum/vinyl.enum";

export default class VinylValidator {
  validateCreateVinyl(vinyl: any) {
    return Joi.object({
      id: Joi.string().required(),
      jacket_type: Joi.string().required(),
      additional: Joi.string().required(),
      front_artwork: Joi.string(),
      back_artwork: Joi.string(),
      inside_left_artwork: Joi.alternatives().conditional('jacket_type', {
        is: 'Gatefold',
        then: Joi.string().required(),
      }),
      inside_right_artwork: Joi.alternatives().conditional('jacket_type', {
        is: 'Gatefold',
        then: Joi.string().required(),
      }),
      spine_artwork: Joi.string(),
    }).validate(vinyl);
  }

  validateGuestUser(user: any) {
    return Joi.object({
      id: Joi.string().required(),
    }).validate(user);
  }

  validateCustomVinyl(vinyl: any) {
    return Joi.object({
      vinyl_gram_weight: Joi.string().required(),
      vinyl_color: Joi.string().required(),
      label_type: Joi.string().required(),
      label_color: Joi.string(),
    }).validate(vinyl);
  }

  validateVinylInfo(vinyl: any) {
    return Joi.object({
      artist_name: Joi.string().required(),
      vinyl_side_a: Joi.string().required(),
      album_name: Joi.string().min(4).max(80).required().required(),
      side_a_tracks_on_label: Joi.boolean().required(),
      vinyl_side_b: Joi.string().required(),
      side_b_tracks_on_label: Joi.boolean().required(),
    }).validate(vinyl);
  }

  validateTracks(tracks: any) {
    return Joi.object({
      tracks: Joi.array().required(),
    }).validate(tracks);
  }

  validateLaunchVinyl(vinyl: any) {
    return Joi.object({
      vinyl_copies: Joi.string().required(),
      quantity_or_duration: Joi.number().required(),
    }).validate(vinyl);
  }
}
