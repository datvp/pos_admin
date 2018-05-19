import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, Text, TextInput } from 'react-native';
import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { Colors, Metrics } from '../Themes';
import { Button, Rating } from '../Components';
import { ReviewTypes } from '../Redux/Review';
import styles from './Styles/ModalWriteReview';

class ModalWriteReview extends Component {
  // Prop type warnings
  static propTypes = {
    isModalVisible: PropTypes.bool.isRequired,
  };

  _onChangeDescription = (description) => {
    let { validation = {} } = this.props;
    if (description === '') {
      validation = {...validation, description: 'Description required'}
    } else delete validation.description;
    this.props.updateStateReview({ description, validation })
  }

  _onStarChange = (rating) => {
    let { validation = {} } = this.props;
    if (rating === '') {
      validation = {...validation, rating: 'Description required'}
    } else delete validation.rating;
    this.props.updateStateReview({ rating, validation });
  }

  render() {
    const {
      isModalVisible = false,
      onDismiss = () => { },
      artistName = '',
      description = '',
      rating = 0,
      submitReview = () => {},
      validation: {
        rating: validationRating = '',
        description: validationDesctiption = '',
      } = {},
    } = this.props;
    return (
      <Modal
        style={styles.modal}
        visible={isModalVisible}
        animationType='fade'
        transparent
        onRequestClose={onDismiss}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Icon style={styles.closeIcon} name='md-close' onPress={onDismiss} />
            <View style={styles.itemContainArtistInfo}>
              <Text>Artist Name: </Text>
              <Text style={styles.textName}>{artistName}</Text>
            </View>
            <View style={styles.itemContainDescription}>
              <Text>Description: </Text>
              <TextInput
                underlineColorAndroid="transparent"
                numberOfLines={4}
                maxLength={150}
                multiline
                style={styles.textDes}
                onChangeText={(description) => this._onChangeDescription(description)}
              >
                {description}
              </TextInput>
            </View>
            { validationDesctiption !== '' && <Text style={styles.errorText}>{validationDesctiption}</Text>}
            <View style={styles.itemContainRating}>
              <Text>Select Rating: </Text>
              <Rating
                starCount={rating}
                starStyle={styles.starStyle}
                onStarChange={this._onStarChange}
              />
            </View>
            { validationRating !== '' && <Text style={styles.errorText}>{validationRating}</Text>}
            <View style={styles.containerButton}>
              <Button
                title='Close'
                titleStyle={styles.buttonTitle}
                style={styles.buttonCancel}
                onPress={onDismiss}
              />
              <Button
                title='Submit'
                titleStyle={styles.buttonTitle}
                style={styles.buttonMain}
                onPress={submitReview}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const { review } = state;
  return {
    ...review,
  };
};

const mapDispatchToProps = dispatch => ({
  updateStateReview: data => dispatch({ type: ReviewTypes.REVIEW_UPDATE_STATE, data }),
  submitReview: () => dispatch({ type: ReviewTypes.REVIEW_SUBMIT }),
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalWriteReview);