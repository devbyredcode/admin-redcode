const textArea = ['inputCaseStudy1', 'inputCaseStudy2', 'inputCaseStudy3', 'inputCaseStudy4', 'inputStory'];
textArea.forEach( item => {
    CKEDITOR.replace( item );
});

$('.dropify').dropify();